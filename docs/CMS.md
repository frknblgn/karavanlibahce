# Wagtail CMS

Decap CMS has been removed. Content is managed by the Django/Wagtail app in
`cms/`. The public Next.js site consumes the Wagtail JSON API and retains local
fallback content for CMS availability failures.

## Local CMS

```powershell
cd cms
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python manage.py makemigrations
python manage.py migrate
python manage.py shell -c "from content.seed import seed; print(seed())"
python manage.py createsuperuser
python manage.py runserver
```

Open Wagtail at `http://localhost:8000/admin/`. The API is available below
`http://localhost:8000/api/`.

## First content entry

1. If you are not using the seed command, create one **HomePage** beneath the Wagtail root page.
2. Add the hero fields, then create Facilities, Nearby Attractions, Gallery
   Images, Reviews, and FAQs from the Snippets menu.
3. Configure Site Settings and Contact Settings for shared business details.
4. Add BlogPost pages beneath HomePage and publish them. Only active snippets
   and published blog posts are returned by the public API.

For this repository, the seed command above imports the existing fallback JSON,
local images, and MDX blog posts so the panel starts with the current site content.

## Deployment

Deploy `cms/` to Render using `cms/render.yaml`, then set its required environment
variables. In Vercel set:

```text
NEXT_PUBLIC_CMS_API_URL=https://your-wagtail-app.onrender.com/api
```

Configure Cloudinary credentials in Render for production media uploads.
