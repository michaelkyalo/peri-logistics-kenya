from models import db

class Packaging(db.Model):
    __tablename__ = "packaging"

    id = db.Column(db.Integer, primary_key=True)
    item_type = db.Column(db.String(120), nullable=False)
    weight_kg = db.Column(db.Float, nullable=False)
    packaging_type = db.Column(db.String(120), nullable=False)
    notes = db.Column(db.Text, default="")
