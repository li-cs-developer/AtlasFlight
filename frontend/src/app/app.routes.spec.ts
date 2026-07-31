import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app.routes';

describe('App Routes', () => {
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)]
    }).compileComponents();

    router = TestBed.inject(Router);
  });

  it('should have routes defined', () => {
    expect(routes.length).toBe(7);
  });

  it('should redirect empty path to dashboard', () => {
    const route = routes.find(r => r.path === '');
    expect(route).toBeDefined();
    expect(route?.redirectTo).toBe('dashboard');
    expect(route?.pathMatch).toBe('full');
  });

  it('should have dashboard route', () => {
    const route = routes.find(r => r.path === 'dashboard');
    expect(route).toBeDefined();
    expect(route?.loadComponent).toBeDefined();
  });

  it('should have airports route', () => {
    const route = routes.find(r => r.path === 'airports');
    expect(route).toBeDefined();
    expect(route?.loadComponent).toBeDefined();
  });

  it('should have airlines route', () => {
    const route = routes.find(r => r.path === 'airlines');
    expect(route).toBeDefined();
    expect(route?.loadComponent).toBeDefined();
  });

  it('should have routes route', () => {
    const route = routes.find(r => r.path === 'routes');
    expect(route).toBeDefined();
    expect(route?.loadComponent).toBeDefined();
  });

  it('should have fleet route', () => {
    const route = routes.find(r => r.path === 'fleet');
    expect(route).toBeDefined();
    expect(route?.loadComponent).toBeDefined();
  });

  it('should have route-finder route', () => {
    const route = routes.find(r => r.path === 'route-finder');
    expect(route).toBeDefined();
    expect(route?.loadComponent).toBeDefined();
  });

  it('should lazy load dashboard component', async () => {
    const route = routes.find(r => r.path === 'dashboard');
    const component = await route?.loadComponent?.();
    expect(component).toBeDefined();
  });

  it('should lazy load airports component', async () => {
    const route = routes.find(r => r.path === 'airports');
    const component = await route?.loadComponent?.();
    expect(component).toBeDefined();
  });

  it('should lazy load airlines component', async () => {
    const route = routes.find(r => r.path === 'airlines');
    const component = await route?.loadComponent?.();
    expect(component).toBeDefined();
  });

  it('should lazy load routes component', async () => {
    const route = routes.find(r => r.path === 'routes');
    const component = await route?.loadComponent?.();
    expect(component).toBeDefined();
  });

  it('should lazy load fleet component', async () => {
    const route = routes.find(r => r.path === 'fleet');
    const component = await route?.loadComponent?.();
    expect(component).toBeDefined();
  });

  it('should lazy load route-finder component', async () => {
    const route = routes.find(r => r.path === 'route-finder');
    const component = await route?.loadComponent?.();
    expect(component).toBeDefined();
  });
});
