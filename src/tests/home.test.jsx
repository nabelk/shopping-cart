import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Home } from '../components/home';
import Router from '../router/router';

describe('home component', () => {
    it('render shop button', () => {
        render(
            <Router>
                <Home />
            </Router>,
        );
        const button = screen.getByRole('button', {
            name: /Shop/i,
        });

        expect(button).toBeInTheDocument();

        fireEvent.click(button);

        expect(window.location.pathname).toBe('/shop');
    });
});
