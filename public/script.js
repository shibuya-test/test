// Firestoreにタスクを保存する関数
function addTaskToFirebase(taskText) {
    db.collection("tasks").add({
        task: taskText,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Task added to Firebase!");
    }).catch((error) => {
        console.error("Error adding task: ", error);
    });
}

// Firebaseからタスクを取得して表示する関数
function loadTasksFromFirebase() {
    db.collection("tasks").orderBy("timestamp").onSnapshot((snapshot) => {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";  // リストをクリア
        snapshot.forEach((doc) => {
            const task = doc.data().task;
            const newTask = document.createElement("li");
            newTask.textContent = task;

            // 削除ボタンを追加
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => {
                doc.ref.delete().then(() => {
                    console.log("Task deleted!");
                });
            });
            newTask.appendChild(deleteButton);

            taskList.appendChild(newTask);
        });
    });
}

// タスクを追加する関数
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value;

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Firebaseにタスクを追加
    addTaskToFirebase(taskText);

    // 入力欄をクリア
    taskInput.value = "";
}

// 「追加」ボタンがクリックされた時にタスクを追加
document.getElementById("addTaskButton").addEventListener("click", addTask);

// ページ読み込み時にFirebaseからタスクを取得
window.addEventListener("load", loadTasksFromFirebase);
