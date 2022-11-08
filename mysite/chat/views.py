from django.shortcuts import render

from .models import Engagement, Room, Message
from .constants import default_entities_types, topics_learn


def index(request):
    # new_rooms = Room.objects.create(name="P1", date_created="2022-11-2")
    # new_rooms.save()

    rooms = Room.objects.all()

    # new_engagement = Engagement.objects.create(name="Machine", date_created="2022-11-2")
    # new_engagement.save()

    # new_engagement1 = Engagement.objects.create(name="P1", date_created="2022-11-2")
    # new_engagement1.save()

    return render(
        request,
        "chat/index.html",
        {
            'rooms': rooms
        }
    )

def room(request, uuid):
    room = Room.objects.get(uuid=uuid)
    messages = Message.objects.filter(room=room)
    engagement_id = request.GET.get('engagement', None)

    return render(
        request,
        'chat/room.html',
        {
            'room': room,
            'messages': messages,
            'engagement_id': engagement_id,
            "default_entities_types": default_entities_types,
            "learn_more_options": topics_learn,
        }
    )
