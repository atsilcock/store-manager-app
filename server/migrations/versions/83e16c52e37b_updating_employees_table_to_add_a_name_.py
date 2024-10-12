"""Updating employees table to add a name colum

Revision ID: 83e16c52e37b
Revises: c146b5be8b18
Create Date: 2024-10-11 21:00:19.305853

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '83e16c52e37b'
down_revision = 'c146b5be8b18'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('employees', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('employees', schema=None) as batch_op:
        batch_op.drop_column('name')

    # ### end Alembic commands ###
