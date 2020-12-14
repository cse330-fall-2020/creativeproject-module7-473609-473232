import functools
import sys

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db

bp = Blueprint('group', __name__, url_prefix='/group')

@bp.route('/create', methods=('GET', 'POST'))
def createGroup():
    print('Hello from python', flush=True)
    if request.method == 'POST':
        usernameToAdd = request.json['usernameToAdd']
        db = get_db()
        error = None

        if not usernameToAdd:
            error = 'Username to be added is required.'
        elif db.execute(
            'SELECT id FROM user WHERE username = ?', (usernameToAdd,)
        ).fetchone() is None:
            error = 'User {} is not registered.'.format(usernameToAdd)

        if error is None:
            return {"success":True}

        flash(error)

    return render_template('auth/register.html')
