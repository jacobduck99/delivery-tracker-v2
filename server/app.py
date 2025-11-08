from flask import Flask
from flask_cors import CORS
from data.database import ensure_db, close_db
from routes.config_routes import config_bp

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:5173"])

    # Create/verify tables once at startup
    with app.app_context():
        ensure_db()

    # Register blueprints exactly once
    app.register_blueprint(config_bp, url_prefix="/api")

    # Ensure DB connection closes after each request
    app.teardown_appcontext(close_db)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)

