import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import ParkEditPage from "main/pages/Parks/ParkEditPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 3
    }),
    useNavigate: () => mockNavigate
}));

const mockUpdate = jest.fn();
jest.mock('main/utils/parkUtils', () => {
    return {
        __esModule: true,
        parkUtils: {
            update: (_Park) => {return mockUpdate();},
            getById: (_id) => {
                return {
                    Park: {
                        park: {
                            id: 3,
                            name: "Anderson Park",
                            address: "123 Fake Ave",
                            rating: "3.9"
                        }
                    }
                }
            }
        }
    }
});


describe("ParkEditPage tests", () => {

    const queryClient = new QueryClient();

    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ParkEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields", async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ParkEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("ParkForm-title")).toBeInTheDocument();
        expect(screen.getByDisplayValue('Anderson Park')).toBeInTheDocument();
        expect(screen.getByDisplayValue('123 Fake Ave')).toBeInTheDocument();
        expect(screen.getByDisplayValue('3.9')).toBeInTheDocument();

    });

    test("redirects to /parks on submit", async () => {

        const restoreConsole = mockConsole();

        mockUpdate.mockReturnValue({
            "Park": {
                id: 3,
                name: "Anderson Park",
                address: "123 Fake Ave",
                rating: "3.9"
            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <ParkEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const titleInput = screen.getByLabelText("Name");
        expect(titleInput).toBeInTheDocument();


        const authorInput = screen.getByLabelText("Address");
        expect(authorInput).toBeInTheDocument();

        const genreInput = screen.getByLabelText("Rating");
        expect(genreInput).toBeInTheDocument();

        const updateButton = screen.getByText("Update");
        expect(updateButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(titleInput, { target: { value: 'Anderson Park' } })
            fireEvent.change(authorInput, { target: { value: '123 Fake Ave' } })
            fireEvent.change(genreInput, { target: { value: '3.9' } })

            fireEvent.click(updateButton);
        });

        await waitFor(() => expect(mockUpdate).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/parks"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `updatedPark: {"Park":{"id":3,"name":"Anderson Park","address":"123 Fake Ave","rating":"3.9"}}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


