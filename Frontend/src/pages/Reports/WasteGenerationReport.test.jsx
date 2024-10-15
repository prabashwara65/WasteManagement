import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import WasteGenerationReport from './WasteGenerationReport'; 
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import { vi } from 'vitest';  // Import Vitest mock utilities

vi.mock('axios');  // Use vi.mock instead of jest.mock

describe('WasteGenerationReport Component', () => {
    test('renders without crashing', () => {
        render(<WasteGenerationReport />);
        expect(screen.getByText(/Zone-Based Garbage Collectors Report/i)).toBeInTheDocument();
    });

    test('shows loading state while fetching data', () => {
        axios.get.mockImplementationOnce(() => new Promise(() => {})); // Simulate pending promise
        render(<WasteGenerationReport />);
        expect(screen.getByText(/Loading collector data.../i)).toBeInTheDocument();
    });

    test('displays collector data correctly', async () => {
        const mockData = [
            { city: 'City A' },
            { city: 'City A' },
            { city: 'City B' },
            { city: 'City C' },
            { city: 'City C' },
            { city: 'City C' },
        ];

        axios.get.mockResolvedValueOnce({ data: mockData });

        render(<WasteGenerationReport />);

        await waitFor(() => {
            expect(screen.getByText(/Total Collectors by City/i)).toBeInTheDocument();
            expect(screen.getByText(/City A/i)).toBeInTheDocument();
            expect(screen.getByText(/City B/i)).toBeInTheDocument();
            expect(screen.getByText(/City C/i)).toBeInTheDocument();
            expect(screen.getByText(/2/i)).toBeInTheDocument(); // Number of collectors for City A
            expect(screen.getByText(/1/i)).toBeInTheDocument(); // Number of collectors for City B
            expect(screen.getByText(/3/i)).toBeInTheDocument(); // Number of collectors for City C
        });
    });

    test('displays error message on fetch error', async () => {
        axios.get.mockRejectedValueOnce(new Error('Fetch error'));

        render(<WasteGenerationReport />);

        await waitFor(() => {
            expect(screen.getByText(/Error: Fetch error/i)).toBeInTheDocument();
        });
    });

    test('calls handleDownloadPDF when button is clicked', async () => {
        const mockData = [
            { city: 'City A' },
            { city: 'City A' },
            { city: 'City B' },
        ];

        axios.get.mockResolvedValueOnce({ data: mockData });
        
        render(<WasteGenerationReport />);
        
        // Wait for the component to finish loading
        await waitFor(() => expect(screen.getByText(/Total Collectors by City/i)).toBeInTheDocument());

        const downloadButton = screen.getByText(/Download as PDF/i);
        // Simulate button click
        fireEvent.click(downloadButton);
        
        // Placeholder for checking if PDF is downloaded.
        // You need a proper implementation to test actual PDF download.
        expect(screen.getByText(/zone-based-garbage-collectors-report.pdf/i)).toBeInTheDocument();
    });
});
