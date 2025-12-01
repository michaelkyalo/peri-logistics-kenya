from models import db
from datetime import datetime

class Request(db.Model):
    __tablename__ = "requests"

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    driver_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    truck_id = db.Column(db.Integer, db.ForeignKey("trucks.id"), nullable=True)
    goods = db.Column(db.String(255), nullable=False)
    weight_kg = db.Column(db.Integer, nullable=False)
    pickup_location = db.Column(db.String(255), nullable=False)
    dropoff_location = db.Column(db.String(255), nullable=False)
    status = db.Column(db.String(50), default="pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "customer_id": self.customer_id,
            "driver_id": self.driver_id,
            "truck_id": self.truck_id,
            "goods": self.goods,
            "weight_kg": self.weight_kg,
            "pickup_location": self.pickup_location,
            "dropoff_location": self.dropoff_location,
            "status": self.status,
            "created_at": self.created_at.isoformat()
        }
