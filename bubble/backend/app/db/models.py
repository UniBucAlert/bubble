from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Table
from sqlalchemy.orm import relation

from .session import Base

UserFriends = Table('UserFriends',
                    Base.metadata,
                    Column('user_id', Integer, ForeignKey('user.id'), primary_key=True),
                    Column('friend_id', Integer, ForeignKey('user.id'), primary_key=True))


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    friends = relation('User',
                       secondary=UserFriends,
                       primaryjoin=UserFriends.c.user_id == id,
                       secondaryjoin=UserFriends.c.friend_id == id,
                       backref="friendOf")

    friend_of = relation('User',
                         secondary=UserFriends,
                         primaryjoin=UserFriends.c.friend_id == id,
                         secondaryjoin=UserFriends.c.user_id == id,
                         backref="friend")
