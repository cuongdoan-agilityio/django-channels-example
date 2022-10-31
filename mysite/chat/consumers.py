import json
import random
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

# Import the Message model
from .models import Room, Message, Engagement

SYSTEM_ID = "a3fa63b2cc55457881b2efaa64d31d84"

the_scripts = ['text','yes_no']

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
        room_id = data["room_id"]

        engagement = await self.get_engagement_by_id(engagement_id)
        await self.save_message(room_id, message, engagement)
        
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "engagement_name": engagement.name,
                "room_id": room_id,
                "entity": the_scripts[random.choice(list_index)],
            }
        )

    # Receive message from room group
    async def chat_message(self, event):
        message = event["message"]
        engagement_name = event["engagement_name"]
        room_id = event["room_id"]
        entity =  event["entity"]

        # Send message to WebSocket
        await self.send(
            text_data=json.dumps({
                "message": message,
                "engagement_name": engagement_name,
                "room_id": room_id,
                "entity": entity,
            })
        )

    @sync_to_async
    def get_engagement_by_id(self, engagement_id):
        return Engagement.objects.get(uuid=engagement_id)

    @sync_to_async
    def save_message(self, room_id, message, engagement):
        room = Room.objects.get(uuid=room_id)
        Message.objects.create(
            engagement=engagement,
            room=room,
            content=message
        )
