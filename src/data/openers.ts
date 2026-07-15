/** A single famous opening line, used as ground truth for the benchmark corpus. */
export interface Opener {
  title: string;
  author: string;
  text: string;
}

/**
 * Well-known opening lines spanning a range of styles — including at least
 * one famously "bad" opener (Paul Clifford) so the corpus isn't only
 * strong examples. Rule scores for these are computed by diagnose(), the
 * same function used on user input — see src/analysis/corpus.ts.
 */
export const OPENERS: Opener[] = [
  { title: "Moby-Dick", author: "Herman Melville", text: "Call me Ishmael." },
  {
    title: "A Tale of Two Cities",
    author: "Charles Dickens",
    text: "It was the best of times, it was the worst of times.",
  },
  {
    title: "Nineteen Eighty-Four",
    author: "George Orwell",
    text: "It was a bright cold day in April, and the clocks were striking thirteen.",
  },
  {
    title: "Anna Karenina",
    author: "Leo Tolstoy",
    text: "All happy families are alike; each unhappy family is unhappy in its own way.",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    text: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    text: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.",
  },
  {
    title: "Neuromancer",
    author: "William Gibson",
    text: "The sky above the port was the color of television, tuned to a dead channel.",
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    text: "It was a pleasure to burn.",
  },
  {
    title: "The Metamorphosis",
    author: "Franz Kafka",
    text: "As Gregor Samsa awoke one morning from uneasy dreams, he found himself transformed in his bed into a horrible vermin.",
  },
  {
    title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    text: "Many years later, as he faced the firing squad, Colonel Aureliano Buendía was to remember that distant afternoon when his father took him to discover ice.",
  },
  {
    title: "The Color Purple",
    author: "Alice Walker",
    text: "You better not never tell nobody but God.",
  },
  { title: "Beloved", author: "Toni Morrison", text: "124 was spiteful." },
  {
    title: "David Copperfield",
    author: "Charles Dickens",
    text: "Whether I shall turn out to be the hero of my own life, or whether that station will be held by anybody else, these pages must show.",
  },
  {
    title: "Don Quixote",
    author: "Miguel de Cervantes",
    text: "Somewhere in la Mancha, in a place whose name I do not care to remember, a gentleman lived not long ago.",
  },
  {
    title: "Their Eyes Were Watching God",
    author: "Zora Neale Hurston",
    text: "Ships at a distance have every man's wish on board.",
  },
  {
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    text: "There was no possibility of taking a walk that day.",
  },
  {
    title: "Mrs. Dalloway",
    author: "Virginia Woolf",
    text: "Mrs. Dalloway said she would buy the flowers herself.",
  },
  {
    title: "A Christmas Carol",
    author: "Charles Dickens",
    text: "Marley was dead, to begin with.",
  },
  {
    title: "Catch-22",
    author: "Joseph Heller",
    text: "It was love at first sight.",
  },
  {
    title: "Invisible Man",
    author: "Ralph Ellison",
    text: "I am an invisible man.",
  },
  {
    title: "Lolita",
    author: "Vladimir Nabokov",
    text: "Lolita, light of my life, fire of my loins.",
  },
  {
    title: "The Go-Between",
    author: "L. P. Hartley",
    text: "The past is a foreign country: they do things differently there.",
  },
  {
    title: "Charlotte's Web",
    author: "E. B. White",
    text: "Where's Papa going with that ax? said Fern to her mother as they were setting the table for breakfast.",
  },
  {
    title: "Slaughterhouse-Five",
    author: "Kurt Vonnegut",
    text: "All this happened, more or less.",
  },
  {
    title: "The Gunslinger",
    author: "Stephen King",
    text: "The man in black fled across the desert, and the gunslinger followed.",
  },
  {
    title: "Paul Clifford",
    author: "Edward Bulwer-Lytton",
    text: "It was a dark and stormy night.",
  },
  {
    title: "Fear and Loathing in Las Vegas",
    author: "Hunter S. Thompson",
    text: "We were somewhere around Barstow on the edge of the desert when the drugs began to take hold.",
  },
  {
    title: "Elmer Gantry",
    author: "Sinclair Lewis",
    text: "Elmer Gantry was drunk.",
  },
  {
    title: "Cat's Cradle",
    author: "Kurt Vonnegut",
    text: "Call me Jonah.",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    text: "In a hole in the ground there lived a hobbit.",
  },
  {
    title: "The Bell Jar",
    author: "Sylvia Plath",
    text: "It was a queer, sultry summer, the summer they electrocuted the Rosenbergs, and I didn't know what I was doing in New York.",
  },
  {
    title: "The Cat in the Hat",
    author: "Dr. Seuss",
    text: "The sun did not shine. It was too wet to play.",
  },
  {
    title: "Peter Pan",
    author: "J. M. Barrie",
    text: "All children, except one, grow up.",
  },
  {
    title: "Gone with the Wind",
    author: "Margaret Mitchell",
    text: "Scarlett O'Hara was not beautiful, but men seldom realized it when caught by her charm.",
  },
];
