import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Header } from '../components/header';
import Router from '../router/router';

describe('header component', () => {
    it('render header correctly', () => {
        const { getByText } = render(
            <Router>
                <Header />
            </Router>,
        );
        const [brandName, homeNav, shopNav] = [
            getByText('BlissBloom'),
            getByText('Home'),
            getByText('Shop'),
        ];

        expect(brandName).toBeInTheDocument();
        expect(homeNav).toBeInTheDocument();
        expect(shopNav).toBeInTheDocument();
    });
});
