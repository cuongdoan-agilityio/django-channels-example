import json
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

# Import the Message model
from .models import Room, Message, Engagement
from .constants import topics_learn

SYSTEM_ID = "0a97af48ae414a8b844b77e9b905a4fe"

# prints a random value from the list
list_index = [0, 1]


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_id = self.scope["url_route"]["kwargs"]["room_id"]
        self.room_group_name = "chat_%s" % self.room_id

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data["message"]
        engagement_id = data["engagement_id"] if data["engagement_id"] else SYSTEM_ID

        is_system_message = True
        if data["engagement_id"]:
            is_system_message = False

        room_id = data["room_id"]
        entity = data["entity"]

        # The answer from Patient
        answer = data["answer"] if "answer" in data else None

        # The question id
        question_id = data["question_id"] if "question_id" in data else None

        if answer:
            await self.update_message(question_id, answer)

        engagement = await self.get_engagement_by_id(engagement_id)
        message_id = await self.new_message(room_id, message, engagement, entity, answer, is_system_message)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "engagement_name": engagement.name,
                "room_id": room_id,
                "entity": entity,
                "message_id": message_id,
                "answer": answer,
                "question_id": question_id,
                "is_system_message": is_system_message,
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event["message"]
        engagement_name = event["engagement_name"]
        room_id = event["room_id"]
        entity =  event["entity"]
        message_id = event["message_id"]
        answer =  event["answer"]
        question_id =  event["question_id"]
        learn_more_options = topics_learn
        is_system_message = event["is_system_message"]

        if entity == "learn-more":
            answer =  answer.split(",")

        # Send message to WebSocket
        await self.send(
            text_data=json.dumps({
                "message": message,
                "engagement_name": engagement_name,
                "room_id": room_id,
                "entity": entity,
                "message_id": message_id,
                "answer": answer,
                "question_id": question_id,
                "learn_more_options": learn_more_options,
                "is_system_message": is_system_message,
            })
        )

    @sync_to_async
    def get_engagement_by_id(self, engagement_id):
        return Engagement.objects.get(uuid=engagement_id)

    @sync_to_async
    def new_message(self, room_id, message, engagement, entity, answer, system_message):
        room = Room.objects.get(uuid=room_id)
        new_message = Message.objects.create(
            engagement=engagement,
            room=room,
            content=message,
            entity = entity,
            system_message = system_message
        )

        return new_message.id

    @sync_to_async
    def update_message(self, id, answer):
        message = Message.objects.get(pk=id)
        if message.entity == "learn-more":
            answer = f"{message.answer},{answer}"

        message.answer = answer
        message.save()
