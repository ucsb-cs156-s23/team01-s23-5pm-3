import { render, screen, act, waitFor, fireEvent } from "@testing-library/react";
import MovieEditPage from "main/pages/Movies/MovieEditPage";
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
jest.mock('main/utils/movieUtils', () => {
    return {
        __esModule: true,
        movieUtils: {
            update: (_movie) => {return mockUpdate();},
            getById: (_id) => {
                return {
                    movie: {
                        id: 3,
                        title: "Good Movie",
                        rating: 10,
                        views: 1000000
                    }
                }
            }
        }
    }
});


describe("MovieEditPage tests", () => {

    const queryClient = new QueryClient();

    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MovieEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields", async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MovieEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        );

        expect(screen.getByTestId("MovieForm-title")).toBeInTheDocument();
        expect(screen.getByDisplayValue('Good Movie')).toBeInTheDocument();
        expect(screen.getByDisplayValue(10)).toBeInTheDocument();
        expect(screen.getByDisplayValue(1000000)).toBeInTheDocument();
    });

    test("redirects to /movies on submit", async () => {

        const restoreConsole = mockConsole();

        mockUpdate.mockReturnValue({
            "movie": {
                id: 3,
                title: "Amazing Movie",
                rating: 11,
                views: 5000000000
            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MovieEditPage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const titleInput = screen.getByLabelText("Title");
        expect(titleInput).toBeInTheDocument();


        const ratingInput = screen.getByLabelText("Rating");
        expect(ratingInput).toBeInTheDocument();

        const viewsInput = screen.getByLabelText("Views");
        expect(viewsInput).toBeInTheDocument();

        const updateButton = screen.getByText("Update");
        expect(updateButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(titleInput, { target: { value: 'Amazing Movie' } })
            fireEvent.change(ratingInput, { target: { value: 11 } })
            fireEvent.change(viewsInput, { target: { value: 5000000000 } })
            fireEvent.click(updateButton);
        });

        await waitFor(() => expect(mockUpdate).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/movies"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `updatedMovie: {"movie":{"id":3,"title":"Amazing Movie","rating":11,"views":5000000000}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


