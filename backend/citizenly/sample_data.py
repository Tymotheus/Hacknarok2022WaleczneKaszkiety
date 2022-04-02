from citizen_endpoints.models import *

def clear_data():
    """Deletes all the table data"""
    # logger.info("Delete Address instances")
    Device.objects.all().delete()
    Location.objects.all().delete()
    Institution.objects.all().delete()
    UserVotes.objects.all().delete()
    print("Successfully cleared all the data")


def seed_database():
    seed_institutions()
    seed_locations()
    seed_devices()
    set_votes()


def seed_institutions():
    Institution.objects.create(id=1, name="Krakowski Park Technologiczny")
    Institution.objects.create(id=2, name="Wydział Fizyki i Informatyki AGH")
    Institution.objects.create(id=3, name="Urząd miejski w Krakowie")
    Institution.objects.create(id=4, name="Centrum Papieża Jana Pawła II")


def seed_locations():
    names = ["Parter", "Pierwsze piętro", "Drugie piętro", "Trzecie piętro "]
    i = 1
    for institution in range(1, 5):
        for name in names:
            Location.objects.create(id=i, institution=Institution.objects.get(id=institution), name=name)
            i += 1


def seed_devices():
    loc = Location.objects.get(institution=Institution.objects.get(id=1), name="Parter")
    loc2 = Location.objects.get(institution=Institution.objects.get(id=1), name="Parter")
    Device.objects.create(
        id=1,
        name="Rośliny w holu",
        type="To create",
        location=loc,
        comment="W holu przydałoby się więcej roślin",
    )
    Device.objects.create(
        id=2,
        name="Suszarka",
        type="To fix",
        location=loc,
        comment="Suszarka na parterze jest zepsuta."
    )
    Device.objects.create(
        id=3,
        name="Kanapa",
        type="To fix",
        location=loc,
        comment="Kanapa przy wejściu się chwieje"
    )
    Device.objects.create(
        id=4,
        name="Kosze na śmieci",
        type="To create",
        location=loc2,
        comment="Brakuje koszy do segregacji odpadów!",
    )
    Device.objects.create(
        id=5,
        name="Tablice na mazaki",
        type="To create",
        location=loc2,
        comment="Studenci chcieliby zobaczyć w sali cichej nauki tablicę na mazaki!",
    )

def set_votes():
    try:
        pass
    except Exception as e:
        print(e)