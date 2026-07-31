import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const navLinks = compiled.querySelectorAll('nav a');
    expect(navLinks.length).toBe(6);
  });

  it('should have all expected navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const linkTexts = Array.from(compiled.querySelectorAll('nav a')).map(a => a.textContent?.trim());

    expect(linkTexts).toContain('Dashboard');
    expect(linkTexts).toContain('Airports');
    expect(linkTexts).toContain('Airlines');
    expect(linkTexts).toContain('Routes');
    expect(linkTexts).toContain('Fleet');
    expect(linkTexts).toContain('🔍 Find Routes');
  });

  it('should have brand name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const brand = compiled.querySelector('h1');
    expect(brand?.textContent).toContain('AtlasFlight');
  });

  it('should have brand with router link to dashboard', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const brand = compiled.querySelector('h1');
    expect(brand?.getAttribute('routerLink')).toBe('/dashboard');
  });
});
