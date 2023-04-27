import { render, screen, fireEvent, act, waitFor } from "@testing-library/react";
import MovieCreatePage from "main/pages/Movies/MovieCreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";
import mockConsole from "jest-mock-console";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

const mockAdd = jest.fn();
jest.mock('main/utils/movieUtils', () => {
    return {
        __esModule: true,
        movieUtils: {
            add: () => { return mockAdd(); }
        }
    }
});

describe("MovieCreatePage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MovieCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("redirects to /movies on submit", async () => {

        const restoreConsole = mockConsole();

        mockAdd.mockReturnValue({
            "movie": {
                id: 3,
                title: "Not a Very Good Movie",
                rating: 5,
                views: 1000
            }
        });

        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MovieCreatePage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const titleInput = screen.getByLabelText("Title");
        expect(titleInput).toBeInTheDocument();


        const ratingInput = screen.getByLabelText("Rating");
        expect(ratingInput).toBeInTheDocument();

        const viewsInput = screen.getByLabelText("Views");
        expect(viewsInput).toBeInTheDocument();

        const createButton = screen.getByText("Create");
        expect(createButton).toBeInTheDocument();

        await act(async () => {
            fireEvent.change(titleInput, { target: { value: 'Not a Very Good Movie' } })
            fireEvent.change(ratingInput, { target: { value: 5 } })
            fireEvent.change(viewsInput, { target: { value: 1000 } })
            fireEvent.click(createButton);
        });

        await waitFor(() => expect(mockAdd).toHaveBeenCalled());
        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/movies"));

        // assert - check that the console.log was called with the expected message
        expect(console.log).toHaveBeenCalled();
        const message = console.log.mock.calls[0][0];
        const expectedMessage =  `createdMovie: {"movie":{"id":3,"title":"Not a Very Good Movie","rating":5,"views":1000}`

        expect(message).toMatch(expectedMessage);
        restoreConsole();

    });

});


