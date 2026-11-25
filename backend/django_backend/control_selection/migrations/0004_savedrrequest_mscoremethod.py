from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("control_selection", "0003_alter_savedrrequest_controllvariables_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="savedrrequest",
            name="mscoremethod",
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
