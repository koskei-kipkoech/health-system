# Health System Management Application

A comprehensive health system management application built with Next.js, MongoDB, and TypeScript. This application empowers healthcare providers to efficiently manage client information, medical programs, and program enrollments.

**Built with Next.js Technologies:**

- [Next.js](https://nextjs.org/) - The React framework for production-grade applications
- [React](https://react.dev/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - JavaScript with static typing

For an in-depth look at the project’s approach, design, and solution, check out the [My Canvas Presentation](https://www.canva.com/design/DAGlyEktuig/UsIo_dacgSz0qN8Ow-SYTA/view?utm_content=DAGlyEktuig&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h4b5d5b5184).

---

## Features

- **Client Management**: Register, view, update, and delete client profiles with ease.
- **Medical Program Administration**: Create, manage, and track healthcare programs.
- **Program Enrollment System**: Enroll clients into multiple programs seamlessly.
- **User Authentication**: Secure login, signup, and logout features.
- **Responsive Dashboard**: Intuitive interface for managing clients and programs.
- **Medical History Tracking**: Store and access detailed client medical records.

---

## Tech Stack

- **Frontend**: [Next.js 13+](https://nextjs.org/) with App Router, [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for rapid, responsive design
- **Database**: [MongoDB](https://www.mongodb.com/) for scalable data storage
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) for secure user management
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) for efficient forms
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for smooth UI transitions

---

## Project Structure

```
health-system/
├── app/                    # Next.js 13 app directory
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── clients/      # Client management endpoints
│   │   └── programs/     # Program management endpoints
│   ├── dashboard/        # Dashboard views
│   └── programs/         # Program management views
├── components/           # React components
│   └── ui/              # UI components
├── lib/                  # Utility functions and configurations
├── models/              # MongoDB models
└── types/               # TypeScript type definitions
```

## API Endpoints

### Authentication

```
POST /api/auth/signup     # Register new user
POST /api/auth/login      # User login
POST /api/auth/logout     # User logout
```

### Client Management

```
GET    /api/clients       # List all clients
POST   /api/clients       # Create new client
GET    /api/clients/:id   # Get client details
PUT    /api/clients/:id   # Update client information
DELETE /api/clients/:id   # Delete client
```

### Program Management

```
GET    /api/programs          # List all programs
POST   /api/programs          # Create new program
GET    /api/programs/:id      # Get program details
PUT    /api/programs/:id      # Update program
DELETE /api/programs/:id      # Delete program
POST   /api/programs/enroll   # Enroll client in program
```

## Data Models

### Client Model

```typescript
interface IClient {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  medicalHistory: {
    conditions: string[];
    allergies: string[];
    medications: string[];
    notes: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  enrolledPrograms: string[];
}
```

### Program Model

```typescript
interface Program {
  name: string;
  type: ProgramType;
  description: string;
  goals: string;
  startDate: Date;
  endDate?: Date;
  status: "active" | "completed" | "planned";
}
```

## Setup Instructions

1. Clone the repository:

```bash
git clone <repository-url>
cd health-system
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
