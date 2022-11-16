import re
from django import template
from django.utils.safestring import mark_safe

register = template.Library()

@register.filter()
def hyperlink_template(message) -> str:
    regex = re.compile(r'(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:\'\".,<>?«»\“\”\‘\’]))?', re.IGNORECASE)
    href = re.search(regex, message).group(0)

    return mark_safe(re.sub(href, f'<a href="{href}" name="hyperlink">{href}</a>', message))
