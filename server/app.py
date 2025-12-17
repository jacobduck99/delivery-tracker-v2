# server/app.py
from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from data.database import ensure_db, close_db, get_db
from routes.config_routes import config_bp
from routes.auth_routes import auth_bp
from routes.run_routes import run_bp
from routes.stats_routes import stats_bp
from auth.user_model import User

def create_app():
    app = Flask(__name__)

    # Required for session cookies (Flask-Login)
    app.secret_key = "change-me-in-env"

    # Allow React dev server to send/receive cookies
    
    CORS(
        app,
        origins=[
        "http://localhost:5173",
        "http://192.168.1.104:5173",
        ],
        supports_credentials=True,
        )


    # Cookie settings (dev-safe; tighten for prod/HTTPS)
    app.config.update(
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE="Lax",  # use "None" (and HTTPS) if cross-site
        SESSION_COOKIE_SECURE=False,    # True in production with HTTPS
    )

    # Create/verify tables once at startup
    with app.app_context():
        ensure_db()

    # Flask-Login
    login_manager = LoginManager()
    # In an API, we usually return 401 JSON instead of redirecting to a page,
    # so login_view isn't used. It's harmless to set, but optional.
    # login_manager.login_view = "auth.login"
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id: str):
        row = get_db().execute(
            "SELECT id, email FROM users WHERE id = ?", (user_id,)
        ).fetchone()
        if row:
            return User(row["id"], row["email"])
        return None

    # Register blueprints exactly once
    app.register_blueprint(auth_bp,  url_prefix="/api/auth")
    app.register_blueprint(config_bp, url_prefix="/api")
    app.register_blueprint(run_bp, url_prefix="/api")
    app.register_blueprint(stats_bp, url_prefix="/api")

    # Ensure DB connection closes after each request
    app.teardown_appcontext(close_db)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
