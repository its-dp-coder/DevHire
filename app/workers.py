from redis import Redis
from rq import Queue

from app.core.config import settings
from app.services.task_service import (
    process_application_notification,
)


redis_connection = Redis.from_url(
    settings.redis_url,
)

task_queue = Queue(
    "devhire",
    connection=redis_connection,
)


def enqueue_application_notification(
    application_id: int,
):
    return task_queue.enqueue(
        process_application_notification,
        application_id,
    )