# Conclusion

Congratulations! You made it through the TSE onboarding guide! In the process, you've received exposure to our software development cycle and some hands-on experience with full-stack web development. This is a huge and complex subject, of course, but we hope that you feel ready to tackle the unique, impactful challenges of your future work in TSE.

We'd really appreciate it if you filled out the brief post-onboarding survey (pinned in **#onboarding**) to let us know what you thought about this whole process. Also, feel free to give feedback directly in **#onboarding**, to your EM, or to anyone else on the board.

That's a wrap for onboarding. We're excited to see what you create next!

## Submission instructions

To show proof of your completion of the onboarding repository, please send a video demo of the following features to your EM on Slack (record your screen as you use the features):

1. Create a new task from the home page (use whatever title and description you want).
2. Display the list of all tasks on the home page. The task you just created should show up.
3. Check off the newly created task.
4. Un-check the newly created task.
5. Click on the title of the newly created task. You should be taken to the task detail page, which should display the task title, description, assignee, status, and creation date.
6. On the task detail page, click "Edit task". Paste in a valid user ID as the assignee, then click "Save". The task should then display the name and profile picture of the user you assigned the task to.

If you run into any issues, please reach out to the **#onboarding** channel on Slack.

## Extra credit

Want to challenge yourself and explore further? Here are some ideas for additional features and improvements:

- **Automatic refresh** [small size, easy difficulty]: Make the `TaskList` on the Home page refresh itself after a new task is successfully created through the `TaskForm`.
- **Automated tests** [small size, easy difficulty]: Add more unit tests to properly cover `TaskForm` and `TaskItem`.
- **Task deletion** [small size, easy difficulty]: Add the ability to delete tasks from the frontend.
- **Better user selection** [medium size, easy difficulty]: Replace the "Assignee ID" text field in the `TaskForm` with a dropdown menu that allows you to choose a user by name. You can use the [Dropdown Constellation component](https://tritonse.github.io/TSE-Constellation/?path=/docs/molecules-dropdown--documentation).
- **Task search, sorting, and filters** [medium size, medium difficulty]: Add the ability to search, sort, and filter tasks (search title/description, sort by title/creation date/status, filter by status, etc.). See [here](https://github.com/TritonSE/PAP-Inventory-Processing/blob/main/backend/src/services/vsrs.ts) for the implementation of a similar feature in a past TSE project.
- **CSV import/export** [medium size, medium difficulty]: Add the ability to upload and download tasks in CSV format.
- **Task due dates** [medium size, hard difficulty]: Add the ability to set a due date on each task and to sort tasks by due date.
- **User accounts and authentication** [large size, hard difficulty]: Add the ability to sign up, sign in, and sign out. Make each task only visible to the user who created it.
