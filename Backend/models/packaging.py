from models import db

class Packaging(db.Model):
    __tablename__ = "packaging"

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(120))
    price = db.Column(db.Float)
