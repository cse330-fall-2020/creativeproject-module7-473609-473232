import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, json
)
from werkzeug.security import check_password_hash, generate_password_hash

from flaskr.db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
        db = get_db()
        error = None

        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'
        elif db.execute(
            'SELECT id FROM user WHERE username = ?', (username,)
        ).fetchone() is not None:
            error = 'User {} is already registered.'.format(username)

        if error is None:
            db.execute(
                'INSERT INTO user (username, password) VALUES (?, ?)',
                (username, generate_password_hash(password))
            )
            db.commit()
            return {"success":True}

        flash(error)

    return render_template('auth/register.html')

@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
        db = get_db()
        error = None
        user = db.execute(
            'SELECT * FROM user WHERE username = ?', (username,)
        ).fetchone()

        if user is None:
            error = 'Incorrect username.'
        elif not check_password_hash(user['password'], password):
            error = 'Incorrect password.'

        if error is None:
            session.clear()
            session['user_id'] = user['id']
            return {"success":True, "username":username}

        flash(error)

    return ({"success":False})

@bp.route('/create', methods=('GET', 'POST'))
def createGroup():
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

    return {"success":False}

@bp.route('/favorite', methods=('GET', 'POST'))
def favorite():
    if request.method == 'POST':
        username = request.json['currentUser']
        movieID = request.json['id']
        print(movieID)
        print(username)
        db = get_db()
        error = None

        if not username:
            error = 'Username is required.'
        elif not movieID:
            error = 'ID is required.'
        elif db.execute(
            'SELECT id FROM favorites WHERE username = ?', (username,)
        ).fetchone() is movieID:
            error = 'This movie has already been favorited'.format(username)

        if error is None:
            db.execute(
                'INSERT INTO favorites (username, id) VALUES (?, ?)',
                (username, movieID)
            )
            db.commit()
            return {"success":True}

        flash(error)

    return {"success":False}

@bp.route('/rating', methods=('GET', 'POST'))
def rating():
    if request.method == 'POST':
        username = request.json['currentUser']
        movieID = request.json['id']
        rating = request.json['rating']
        print(movieID)
        print(username)
        print(rating)
        db = get_db()
        error = None

        if not username:
            error = 'Username is required.'
        elif not movieID:
            error = 'ID is required.'
        elif not rating:
            error = 'Rating is required'
        # elif db.execute(
        #     'SELECT id FROM favorites WHERE username = ?', (username,)
        # ).fetchone() is movieID:
        #     error = 'This movie has already been favorited'.format(username)

        if error is None:
            db.execute(
                'INSERT INTO ratings (username, id, rating) VALUES (?, ?, ?)',
                (username, movieID, rating)
            )
            db.commit()
            return {"success":True}

        flash(error)

    return {"success":False}

@bp.route('/grabRatings', methods=('GET', 'POST'))
def grabRatings():

    if request.method == 'POST':
        username = request.json['username']
        db = get_db()
        error = None

        if not username:
            error = 'Username is required.'
            print("NOT USERNAME")

        if error is None:
            rows = db.execute(
                'SELECT id, rating from ratings WHERE username = ?', (username,)
            ).fetchall()

            db.commit()

            dict = {}

            for row in rows:
                dict.update({row[0] : row[1]})
                print("HELLO", dict[row[0]])
                

            return dict, {"success":True}

        flash(error)
        print("FAILED")

    return {"success":False}

@bp.route('/grabFavorites', methods=('GET', 'POST'))
def grabFavorites():

    if request.method == 'POST':
        username = request.json['username']
        db = get_db()
        error = None

        if not username:
            error = 'Username is required.'
            print("NOT USERNAME")

        if error is None:
            rows = db.execute(
                'SELECT id from favorites WHERE username = ?', (username,)
            ).fetchall()

            db.commit()

            dict = {}

            for row in rows:
                dict.update({row[0] : username})
                print("HELLO", dict[row[0]])
                

            return dict, {"success":True}

        flash(error)
        print("FAILED")

    return {"success":False}
    

@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
        ).fetchone()

@bp.route('/logout')
def logout():
    session.clear()
    return session.get('user_id');

def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))

        return view(**kwargs)

    return wrapped_view
