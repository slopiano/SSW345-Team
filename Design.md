MonitoringBot: Monitoring task progress

Problem Statement:

Team needs an effective method of keeping track of tasks being done on a project. Need to ensure that the tasks are being done effectively and that they get completed on time. This is a problem when completing tasks as a team since it is hard to gauge what has been done by who on the project. It is especially important on development since certain parts of a project can only be started once other portions have been completed. An example of this would be creating a subclass, where the child class inherits the properties of a parent class. The individual working on the child class would need to know when the individual working on the parent class is finished in order to start development. The purpose of the bot is to ensure that whatever task has been completed, that it is immediately known to other participants in order to speed up development.

Bot Description:

Tagline: A task to complete all tasks

This bot will monitor the classes, functions, and procedures completed in a group with a particular coding project. The purpose of this is to ensure easy communication between workers and project managers on the lifecycle of a project. For the workers, it is to inform others when they can start working on tasks that are dependent on others' work. An example of this is starting development on a child class which is dependent on the parent class. The bot will communicate with workers through a checking system. A worker will have the ability to add progress on a specific task via percentage. If he/she believes the task is 50% finished, the task will show 50% completion and that value will be an input that can be taken in from the worker. It is also possible for the worker to complete the task as well.
For the project managers, this tool will allow them to see the progress on a project. They will be able to see the individual progress of each task as well as progress of the project as a whole. The bot will communicate with the project managers as well. They will be able to create new projects and tasks, as well as assign tasks to group members. If a task is taking a lot of time to complete the project managers can increase the number of workers on that task as well. They will also be able to see what tasks are dependent on others as well.

Use cases:

Find tasks in queue

Preconditions: Signed in

Main Flow:
All tasks in a project will be displayed. User selects “Tasks in queue” selector in the project to see all the tasks currently being worked on [S1]. User clicks on a specific task to open up a description on the task [S2]. Screen shows a more in depth description of a specific task [S3].

SubFlows:
[S1] User selects “Tasks in queue” to show all tasks that are currently not being worked due to it being dependent on other tasks.

[S2] Tasks in queue are shown with a percentage completed. User then selects a specific task that can be started.

[S3] Screen displays description of the task as well as who is working on it, the percentage completed, and a tree diagram of tasks that it is connected to. User selects work on task to start working on the task.

Alternative flows:
There are no tasks available that are currently in queue, all tasks are currently being worked on.

Add tasks to the queue

Preconditions: Signed in

Main Flow:
User selects "add new task" selector in the project to add a new task [S1]. User then writes a description of the task [S2]. Task is added to the queue and the user is shown a confirmation on screen [S3].

Subflows:
[S1] User selects "add new task" selector in the project to add a new task.

[S2] Template is shown and user is able to write a description for the task to be done.

[S3] Backend adds task to the queue and user is shown a confirmation.

Design Sketches:

See Sequence Diagram.png for sequence diagram

See Story Board.png for story board
