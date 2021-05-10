"""create UserFriends table

Revision ID: 55fbb4148b73
Revises: 91979b40eb38
Create Date: 2021-05-06 10:19:45.137709-07:00

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '55fbb4148b73'
down_revision = '91979b40eb38'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "UserFriends",
        sa.Column('user_id', sa.Integer, sa.ForeignKey('user.id')),
        sa.Column('friend_id', sa.Integer, sa.ForeignKey('user.id')),
    )


def downgrade():
    op.drop_table("UserFriends")
