from uuid import uuid4

default_entities_types = [
    {"id": "text", "label": "Text"},
    {"id": "yes-no", "label": "Yes/No Interaction"},
    {"id": "date-time", "label": "Date time picker"},
    {"id": "learm-more", "label": "Learn More"},
]

topics_learn = [
    {
        "id": f"{uuid4()}",
        "value": "hydration",
        "title": "Hydration",
        "mesage": "You'll need to drink more water when you are pregnant to support your body and your growing baby.",
    },
    {
        "id": f"{uuid4()}",
        "title": "Stretch Legs",
        "value": "stretch_legs",
        "mesage": "Grab the top of your left foot and gently pull your heel towards your left buttock to stretch the front of the thigh. Keep your knees touching. Repeat on the other side.",
    },
    {
        "id": f"{uuid4()}",
        "title": "Nutrition",
        "value": "nutrition",
        "mesage": "Eat lots of vegetables and fish, less meat from mammals. Fruit enhancement and less fast food.",
    },
    {
        "id": f"{uuid4()}",
        "title": "Healthy Exercises",
        "value": "healthy_exercises",
        "mesage": "Swimming. The Chinese martial art that combines movement and relaxation is good for both body and mind. Strength training. Walking, and kegel exercises.",
    },
]
