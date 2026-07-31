import pytest


class TestRoutesAPI:
    def test_get_routes_no_params(self, client, sample_data):
        """Test GET /api/routes/ without parameters"""
        response = client.get("/api/routes/")
        assert response.status_code == 200
        data = response.json()
        
        assert "total" in data
        assert "items" in data
        assert data["total"] > 0
        
        # Check structure
        first_route = data["items"][0]
        assert "route_id" in first_route
        assert "stops" in first_route
        assert "source_name" in first_route
        assert "source_airport" in first_route
        assert "destination_name" in first_route
        assert "destination_airport" in first_route
        assert "airline" in first_route

    def test_get_routes_with_limit(self, client, sample_data):
        """Test GET /api/routes/ with limit"""
        response = client.get("/api/routes/?limit=2")
        assert response.status_code == 200
        data = response.json()
        
        assert len(data["items"]) == 2
        assert data["total"] > 0

    def test_get_routes_with_limit_and_offset(self, client, sample_data):
        """Test GET /api/routes/ with limit and offset"""
        response1 = client.get("/api/routes/?limit=1&offset=0")
        response2 = client.get("/api/routes/?limit=1&offset=1")
        
        assert response1.status_code == 200
        assert response2.status_code == 200
        
        data1 = response1.json()
        data2 = response2.json()
        
        if len(data1["items"]) > 0 and len(data2["items"]) > 0:
            assert data1["items"][0]["route_id"] != data2["items"][0]["route_id"]

    def test_get_routes_includes_airline_info(self, client, sample_data):
        """Test that routes include airline information"""
        response = client.get("/api/routes/")
        assert response.status_code == 200
        data = response.json()
        
        for route in data["items"]:
            assert "airline" in route
            # Airline can be None if no airline is associated with the route
            # Just check the field exists

    def test_find_routes_between_airports(self, client, sample_data):
        """Test GET /api/routes/find - find routes between ATL and LAX"""
        response = client.get("/api/routes/find?from=ATL&to=LAX")
        assert response.status_code == 200
        data = response.json()
        
        assert len(data) >= 1
        
        # Check structure
        first_route = data[0]
        assert "route_id" in first_route
        assert "stops" in first_route
        assert "source_name" in first_route
        assert "source_airport" in first_route
        assert first_route["source_airport"] == "ATL"
        assert "destination_name" in first_route
        assert "destination_airport" in first_route
        assert first_route["destination_airport"] == "LAX"
        assert "airline" in first_route

    def test_find_routes_between_airports_with_stops(self, client, sample_data):
        """Test GET /api/routes/find - find routes between ATL and LHR"""
        response = client.get("/api/routes/find?from=ATL&to=LHR")
        assert response.status_code == 200
        data = response.json()
        
        assert len(data) >= 1
        
        # Check that all routes go from ATL to LHR
        route = data[0]
        assert route["source_airport"] == "ATL"
        assert route["destination_airport"] == "LHR"
        # Stops can be 0 or 1 - just verify it's an integer
        assert isinstance(route["stops"], int)

    def test_find_routes_no_results(self, client, sample_data):
        """Test GET /api/routes/find - no routes found (use non-existent airports)"""
        # Use airports that don't exist in your database
        response = client.get("/api/routes/find?from=XXX&to=YYY")
        assert response.status_code == 200
        data = response.json()
        
        assert len(data) == 0

    def test_find_routes_invalid_airport(self, client, sample_data):
        """Test GET /api/routes/find - invalid airport code"""
        response = client.get("/api/routes/find?from=XYZ&to=ABC")
        assert response.status_code == 200
        data = response.json()
        
        assert len(data) == 0

    def test_find_routes_same_airport(self, client, sample_data):
        """Test GET /api/routes/find - same origin and destination"""
        response = client.get("/api/routes/find?from=ATL&to=ATL")
        assert response.status_code == 200
        data = response.json()
        
        assert len(data) == 0

    def test_find_routes_returns_sorted_by_stops(self, client, sample_data):
        """Test that find_routes returns results sorted by stops"""
        response = client.get("/api/routes/find?from=ATL&to=LHR")
        assert response.status_code == 200
        data = response.json()
        
        if len(data) > 1:
            stops = [route["stops"] for route in data]
            assert stops == sorted(stops)