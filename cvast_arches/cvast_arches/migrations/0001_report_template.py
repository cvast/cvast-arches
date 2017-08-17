from __future__ import unicode_literals
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = []

    operations = [
        migrations.RunSQL(
            """
            INSERT INTO report_templates(
                templateid, 
                name, 
                description, 
                component, 
                componentname, 
                defaultconfig) 
            VALUES (
                '50000000-0000-0000-0000-000000000004', 
                'File Header Template', 
                'File Header', 
                'reports/file', 
                'file-report', 
                '{"nodes": []}');
            """,

            """
            DELETE FROM report_templates
                WHERE componentname = 'file-report';
            """
        )
    ]
