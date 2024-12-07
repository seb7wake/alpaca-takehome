from tortoise import fields
from tortoise.models import Model

class Session(Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=255)
    patient_name = fields.CharField(max_length=255)
    start_date = fields.DatetimeField()
    end_date = fields.DatetimeField()
    notes = fields.TextField()
    ai_summary = fields.TextField()
    created_at = fields.DatetimeField(auto_now_add=True)

    def __str__(self):
        return self.title