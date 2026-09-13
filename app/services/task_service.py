import time


def process_application_notification(
    application_id: int,
) -> dict:
    time.sleep(1)

    return {
        "application_id": application_id,
        "status": "notification_processed",
    }