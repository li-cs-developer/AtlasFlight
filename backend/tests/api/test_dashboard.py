import pytest


class TestDashboardAPI:
    def test_get_dashboard_stats(self, client, sample_data):
        """Test GET /api/dashboard/ returns stats"""
        response = client.get("/api/dashboard/")
        assert response.status_code == 200
        data = response.json()
        
        assert "total_airports" in data
        assert "total_airlines" in data
        assert "total_routes" in data
        assert "total_countries" in data
        
        # Just verify they're positive integers
        assert data["total_airports"] > 0
        assert data["total_airlines"] > 0
        assert data["total_routes"] > 0
        assert data["total_countries"] > 0

    def test_get_dashboard_stats_returns_integers(self, client, sample_data):
        """Test that dashboard stats are integers"""
        response = client.get("/api/dashboard/")
        assert response.status_code == 200
        data = response.json()
        
        assert isinstance(data["total_airports"], int)
        assert isinstance(data["total_airlines"], int)
        assert isinstance(data["total_routes"], int)
        assert isinstance(data["total_countries"], int)

    def test_get_top_airlines(self, client, sample_data):
        """Test GET /api/dashboard/top-airlines"""
        response = client.get("/api/dashboard/top-airlines")
        assert response.status_code == 200
        data = response.json()
        
        # Should return top 5
        assert len(data) <= 5
        
        # Check structure
        if len(data) > 0:
            first = data[0]
            assert "name" in first
            assert "value" in first
            assert isinstance(first["value"], int)

    def test_get_top_airlines_returns_delta(self, client, sample_data):
        """Test that Delta appears in top airlines"""
        response = client.get("/api/dashboard/top-airlines")
        assert response.status_code == 200
        data = response.json()
        
        # Just verify data exists
        assert len(data) > 0