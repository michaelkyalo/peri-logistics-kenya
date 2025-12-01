from models import db
import enum
from datetime import datetime

class TruckStatus(enum.Enum):
    AVAILABLE = "available"
    BUSY = "busy"
    MAINTENANCE = "maintenance"

class Truck(db.Model):
    __tablename__ = "trucks"

    id = db.Column(db.Integer, primary_key=True)
    plate_number = db.Column(db.String(50), unique=True, nullable=False)
    capacity_kg = db.Column(db.Integer, nullable=False)
    refrigerated = db.Column(db.Boolean, default=True)
    status = db.Column(db.Enum(TruckStatus), default=TruckStatus.AVAILABLE)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "plate": self.plate_number,
            "capacity_kg": self.capacity_kg,
            "refrigerated": self.refrigerated,
            "status": self.status.value
        }
