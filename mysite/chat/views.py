from django.shortcuts import render

from .models import Engagement, Room, Message
from .constants import default_entities_types


def index(request):
    rooms = Room.objects.all()

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
        }
    )
