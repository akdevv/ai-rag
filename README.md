# AI RAG (Retrieval-Augmented Generation) Application

This is a Next.js-based application that implements a Retrieval-Augmented Generation (RAG) system, allowing users to upload documents and interact with them through a chat interface. The application uses Ollama for embeddings and Groq AI for generating responses.

## Features

- Document Upload: Support for PDF, DOCX, and TXT files
- Real-time Chat Interface: Interactive chat with your documents
- Memory Storage: Efficient storage and retrieval of document embeddings
- Streaming Responses: Real-time AI responses
- Modern UI: Responsive design with loading states and error handling

## Prerequisites

Before running this project, you need to have the following installed:

- Node.js (v18 or higher)
- pnpm (Package Manager)
- Ollama (for local embeddings)

## Local Setup

### 1. Install Ollama and Required Models

```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Install required models
ollama pull mistral
ollama pull nomic-embed-text
```

### 2. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd ai-rag

# Install dependencies
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
GROQ_API_KEY=your_groq_api_key
```

### 4. Run the Development Server

```bash
# Start the development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `/app`: Next.js application code
- `/components`: Reusable UI components
- `/services`: Backend services and utilities
- `/api`: API routes for file processing and chat
- `/context`: Global state management

## Technology Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **AI/ML**: Ollama (embeddings), Groq AI (response generation)
- **Storage**: In-memory storage for embeddings
- **Development**: pnpm, ESLint, Prettier

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Ollama Documentation](https://ollama.ai/docs)
- [Groq AI Documentation](https://groq.com/docs)

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

