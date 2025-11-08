from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)

    # Allow Vite dev origin to call /api/*
    CORS(
        app,
        resources={r"/api/*": {"origins": "http://localhost:5173"}},
        supports_credentials=False,   # flip to True only if you use cookies
    )

    from routes.config_routes import config_bp
    app.register_blueprint(config_bp, url_prefix="/api")  # ← IMPORTANT

    return app

app = create_app()


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)
