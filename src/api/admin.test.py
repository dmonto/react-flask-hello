
def test_setup_admin_with_env_key(self):
    """
    Should set the app secret key from the FLASK_APP_KEY environment variable when present
    """
    app = Flask(__name__)
    test_key = "test_secret_key_123"
    with patch.dict(os.environ, {"FLASK_APP_KEY": test_key}):
        setup_admin(app)
    self.assertEqual(app.secret_key, test_key)

def test_setup_admin_default_key(self):
    """
    Should set the app secret key to the default 'sample key' when the environment variable is not present
    """
    app = Flask(__name__)
    # Ensure the environment variable is not set for this test
    if 'FLASK_APP_KEY' in os.environ:
        del os.environ['FLASK_APP_KEY']
    
    setup_admin(app)
    self.assertEqual(app.secret_key, 'sample key')

def test_admin_instance_associated_with_app(self):
    """
    Should verify the admin instance is correctly associated with the Flask app object
    """
    app = Flask(__name__)
    # Mock the db.session to avoid database connection issues during the test
    db.session = MagicMock()
    
    setup_admin(app)
    
    self.assertIn('admin', app.extensions)
    admin_instance = app.extensions['admin']
    self.assertIsInstance(admin_instance, Admin)
    self.assertEqual(admin_instance.app, app)
    self.assertEqual(admin_instance.name, '4Geeks Admin')
