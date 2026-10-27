```markdown
# Finance Microservices Monorepo

A scalable personal finance management backend built using a **Microservices Architecture** with an event-driven approach. 

---

## 🚀 Tech Stack

- **Backend Framework:** [NestJS](https://nestjs.com/) (TypeScript)
- **Message Broker:** [RabbitMQ](https://www.rabbitmq.com/) (Asynchronous inter-service communication)
- **Databases:** [PostgreSQL](https://www.postgresql.org/) (Isolated database per service using TypeORM)
- **Cache / Store:** [Redis](https://redis.io/)
- **Containerization:** [Docker & Docker Compose](https://www.docker.com/)

---

## 📂 Project Structure

```text
finance-microservices/
├── docker-compose.yml          # Shared infrastructure (Postgres, Redis, RabbitMQ)
├── README.md                   # Project documentation
└── services/
    ├── api-gateway/            # API Gateway service (Entry point)
    ├── transaction-service/    # Manages transactions & publishes events (Port 3000)
    └── budget-service/         # Consumes events & manages budget tracking (Port 3001)

```

---

## 🛠️ Prerequisites

Make sure you have the following installed on your machine:

* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* [Docker & Docker Compose](https://www.docker.com/get-started)

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone [https://github.com/juliusromakin/finance-microservices.git](https://github.com/juliusromakin/finance-microservices.git)
cd finance-microservices

```

### 2. Start Infrastructure (Docker Compose)

Spin up PostgreSQL databases, Redis, and RabbitMQ:

```bash
docker compose up -d

```

* **RabbitMQ Management Dashboard:** `http://localhost:15672` (User: `guest`, Password: `guest`)
* **Transaction DB (`transactions_db`):** Port `5432`
* **Budget DB (`budgets_db`):** Port `5433` (Mapped internally to `5432`)

### 3. Install Dependencies

Navigate into each service directory and install the required dependencies:

* **Transaction Service:**
```bash
cd services/transaction-service
npm install

```


* **Budget Service:**
```bash
cd ../budget-service
npm install

```


* **API Gateway (if applicable):**
```bash
cd ../api-gateway
npm install

```



---

## 🏃‍♂️ Running the Services

Open multiple terminal windows/tabs to run each microservice concurrently in development mode (`watch` mode):

1. **Run Transaction Service:**
```bash
cd services/transaction-service
npm run start:dev

```


*(Runs on port 3000)*
2. **Run Budget Service:**
```bash
cd services/budget-service
npm run start:dev

```


*(Runs on port 3001 and listens to RabbitMQ queue)*

---

## 🔄 Event-Driven Communication Flow

* When a new transaction is created via the **Transaction Service**, it saves it to its database (`transactions_db`) and emits an event (`transaction_created`) to **RabbitMQ**.
* The **Budget Service** acts as a background consumer, listening to `transactions_queue`. Upon receiving the event, it automatically updates the respective budget counters in `budgets_db`.

---

## 📄 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).

```

```
