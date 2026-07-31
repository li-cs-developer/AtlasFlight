import pytest


class TestFleetAPI:
    def test_get_fleet(self, client, sample_data):
        """Test GET /api/fleet/ returns fleet data"""
        response = client.get("/api/fleet/")
        assert response.status_code == 200
        data = response.json()
        
        assert "items" in data
        assert len(data["items"]) >= 2
        
        # Check structure
        first_item = data["items"][0]
        assert "icao_code" in first_item
        assert "name" in first_item
        assert "count" in first_item
        assert "operators" in first_item
        assert "registrations" in first_item
        assert "active" in first_item

    def test_get_fleet_aircraft_count(self, client, sample_data):
        """Test that aircraft counts are correct"""
        response = client.get("/api/fleet/")
        assert response.status_code == 200
        data = response.json()
        
        # Find Boeing 737
        b737 = next((item for item in data["items"] if "Boeing" in item["name"]), None)
        assert b737 is not None
        assert b737["count"] >= 1
        assert b737["operators"] >= 1
        
        # Find Airbus A320
        a320 = next((item for item in data["items"] if "Airbus" in item["name"]), None)
        assert a320 is not None
        assert a320["count"] >= 1

    def test_get_fleet_sorted_by_count(self, client, sample_data):
        """Test that fleet is sorted by total aircraft count descending"""
        response = client.get("/api/fleet/")
        assert response.status_code == 200
        data = response.json()
        
        if len(data["items"]) > 1:
            counts = [item["count"] for item in data["items"]]
            assert counts == sorted(counts, reverse=True)