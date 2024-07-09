# Four main levels: System Context, Container, Component, Code

As a communication tool, the C4 model enables all stakeholders, not just developers, to use the model to understand and communicate about the structure of the software system. Project managers and product owners can use the Context and Container levels to discuss the high-level overview of the system, while Software Architects, Designers, and Implementers can use the Component and Code level to focus on the low-level details.

## System Context
The Context level provides a birds-eye view of the system, giving an overview of system boundaries, external actors (users), and their interactions with the system.
This level answers the question, "What is the system and how does it interface with the external world? How does it interact with actors, or users?" It provides a very high-level overview of the overall software architecture.

## Container
The Container level focuses on the major architectural building blocks of the system. This can include web servers, databases, desktop apps, microservices, or external services such as APIs. It communicates how these systems interact with each other.

Containers here refer to anything like web severs, databases, mobile apps, desktop apps, filesystems, microservices, external APIs, etc. This level is still useful for both technical and non-technical stakeholders, but provides a more detailed look at the internals of the software architecture. Here we are able to define various interactions between the containers, for example, do the web servers read and write to the database or do they interface with the external APIs? How do the web servers interact with microservices? How does the database interact with the file system? All this is modeled at the Container level.

If you have Microservice architecture then each Microservice would be a container.
Examples of containers are:
- Single page application
- Web server
- Serverless function
- Database
- API
- Message buses

## Component
The Component level zooms into a container, showing the internal structure and building blocks of that container and how those building blocks relate to one another. It focuses on the key responsibilities within the container and how they interact with one another.

As we dive deeper we start to get into more technical details and start to delve into the realm that is more exclusively for designers, architects, and the software implementers. Next we have the Component level, and this is what we get when we zoom in on a container and see the building blocks that it comprises of. For example, suppose we zoom in on an ETL Pipeline and look at the components that make it up. We might see an extraction component, a validation component, a transform component, a loading component, and a monitoring and logging component. This is the layer of services, controllers, repositories, etc. and provides a more granular view of the structure of the overall system architecture. This is especially important for the architects and the developers because it provides details necessary for developing the actual code.

Examples of components are:
- Services
- Controllers
- Repositories
- Models
- Views
- Modules
- Packages
- Libraries
- Frameworks
- Databases
- Queues
- Caches
- APIs
- Message brokers
- etc.

## Code
The Code level provides a detailed view of the code structure of the component, showing details such as the classes, modules, and packages. This aids developers in understanding the actual implementation of these components.

The final level of the C4 model is the code level and represents the individual code elements within the software architecture. These are the tiniest elements of the model, and represent specific classes, modules, interfaces, and other code elements. It provides an extremely detailed view of the architecture and is useful for developers implementing the code and answering questions like, "What does this class look like" and "How do I implement this interface" and "What is the relationship between these classes?"

Examples of code elements are:
- Classes
- Modules
- Interfaces
- Functions
- Methods
- Variables
- Constants
- etc.


# From copilot
# System Context

Context diagram is a high-level diagram that shows the system under consideration along with its relationship to external entities. It is a good starting point for diagramming and documenting a software system, allowing you to step back and see the big picture. It is also a great communication tool for stakeholders.

System_Boundary_Bank(Online Banking System, "Allows customers to view information about their bank accounts, and make payments.")
System_Boundary_Customer(Customer, "A customer of the bank.")
Rel(Customer, Online Banking System, "Uses")

# Container
Container diagram shows the high-level shape of the software architecture and how responsibilities are distributed across it. It also shows the major technology choices and how the containers communicate with one another. It's a high-level diagram that is useful for software developers and support/operations staff alike. It is also useful during the software design process and as a way of getting an overview of the system.

Container_Bank(Online Banking System, "Allows customers to view information about their bank accounts, and make payments.")
Container_Customer(Customer, "A customer of the bank.")
Rel(Customer, Online Banking System, "Uses")

# Component
Component diagram shows the internal structure of a software system and the dependencies between software components. It is useful during the software design process and for communicating the design to developers and stakeholders.

Component_Bank(Online Banking System, "Allows customers to view information about their bank accounts, and make payments.")
Component_Customer(Customer, "A customer of the bank.")
Rel(Customer, Online Banking System, "Uses")

# Code
Code diagram shows the internal structure of a software system and the dependencies between software components. It is useful during the software design process and for communicating the design to developers and stakeholders.

Code_Bank(Online Banking System, "Allows customers to view information about their bank accounts, and make payments.")
Code_Customer(Customer, "A customer of the bank.")
Rel(Customer, Online Banking System, "Uses")
```
Refs:
- https://packagemain.tech/p/software-architecture-diagrams-c4
- https://dev.to/fractalis/mastering-software-architecture-visualization-with-the-c4-model-em2
- https://github.com/SlavaVedernikov/C4InterFlow?tab=readme-ov-file
- https://medium.com/@javiervivanco/el-modelo-c4-de-documentaci%C3%B3n-para-la-arquitectura-de-software-424704528390