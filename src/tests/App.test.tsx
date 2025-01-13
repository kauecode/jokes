import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';

// Mock the API response
vi.mock('../services/apiClient', () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      getJokes: vi.fn().mockResolvedValue({ jokes: [
        { id: 1, setup: 'This is a joke setup', delivery: 'This is a joke delivery' }
      ]})
    }))
  };
});

describe('App Component', () => {
  it('Should load a joke and display both parts on the screen', async () => {    
    render(<App />);    
    await waitFor(() => {
      const setupText = screen.getByText(/This is a joke setup/i);
      const deliveryText = screen.getByText(/This is a joke delivery/i);
      expect(setupText).toBeInTheDocument();
      expect(deliveryText).toBeInTheDocument();
    }, { timeout: 2000 });  //Make sure we passed the loading screen since I have forced a delay for people to see the loaders.
  });
});