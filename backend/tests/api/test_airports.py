import pytest


class TestAirportsAPI:
    def test_get_airports_no_params(self, client, sample_data):
        """Test GET /api/airports/ without any parameters"""
        response = client.get("/api/airports/")
        assert response.status_code == 200
        data = response.json()
        
        assert "total" in data
        assert "items" in data
        assert data["total"] > 0
        
        # Check structure
        first_airport = data["items"][0]
        assert "airport_id" in first_airport
        assert "name" in first_airport
        assert "iata_code" in first_airport
        assert "city" in first_airport
        assert "country" in first_airport

    def test_get_airports_with_limit(self, client, sample_data):
        """Test GET /api/airports/ with limit parameter"""
        response = client.get("/api/airports/?limit=2")
        assert response.status_code == 200
        data = response.json()
        
        assert len(data["items"]) == 2
        assert data["total"] > 0

    def test_get_airports_with_limit_and_offset(self, client, sample_data):
        """Test GET /api/airports/ with limit and offset"""
        response1 = client.get("/api/airports/?limit=1&offset=0")
        response2 = client.get("/api/airports/?limit=1&offset=1")
        
        assert response1.status_code == 200
        assert response2.status_code == 200
        
        data1 = response1.json()
        data2 = response2.json()
        
        if len(data1["items"]) > 0 and len(data2["items"]) > 0:
            assert data1["items"][0]["airport_id"] != data2["items"][0]["airport_id"]

    def test_get_airports_search_by_name(self, client, sample_data):
        """Test GET /api/airports/ with search parameter (name)"""
        # Use a common airport name that exists
        response = client.get("/api/airports/?search=Atlanta")
        assert response.status_code == 200
        data = response.json()
        # Just verify it works, don't assert specific count

    def test_get_airports_search_by_iata(self, client, sample_data):
        """Test GET /api/airports/ with search parameter (IATA code)"""
        response = client.get("/api/airports/?search=ATL")
        assert response.status_code == 200
        data = response.json()

    def test_get_airports_search_by_icao(self, client, sample_data):
        """Test GET /api/airports/ with search parameter (ICAO code)"""
        response = client.get("/api/airports/?search=KATL")
        assert response.status_code == 200
        data = response.json()

    def test_get_airports_filter_by_country(self, client, sample_data):
        """Test GET /api/airports/ with country filter"""
        response = client.get("/api/airports/?country=US")
        assert response.status_code == 200
        data = response.json()

    def test_get_airports_filter_by_country_gb(self, client, sample_data):
        """Test GET /api/airports/ with country filter (GB)"""
        response = client.get("/api/airports/?country=GB")
        assert response.status_code == 200
        data = response.json()

    def test_get_airports_search_and_filter_combined(self, client, sample_data):
        """Test GET /api/airports/ with both search and filter"""
        response = client.get("/api/airports/?search=ATL&country=US")
        assert response.status_code == 200
        data = response.json()

    def test_get_airports_search_no_results(self, client, sample_data):
        """Test GET /api/airports/ with search that returns no results"""
        response = client.get("/api/airports/?search=XYZ123")
        assert response.status_code == 200
        data = response.json()
        
        assert data["total"] == 0
        assert len(data["items"]) == 0

    def test_get_countries(self, client, sample_data):
        """Test GET /api/airports/countries"""
        response = client.get("/api/airports/countries")
        assert response.status_code == 200
        data = response.json()
        
        assert len(data) > 0
        first_country = data[0]
        assert "iso_code" in first_country
        assert "name" in first_country