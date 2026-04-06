et tickets = [];

function addTicket() {
const customer = document.getElementById("customer").value;
const subject = document.getElementById("subject").value;
const category = document.getElementById("category").value;
const urgency = document.getElementById("urgency").value;
const description = document.getElementById("description").value;

if (!customer || !subject || !description) {
alert("Please fill all fields");
return;
}
l
const ticket = {
id: Date.now(),
customer,
subject,
category,
urgency,
description,
status: "Open",
agent: "Unassigned",
created: new Date().toLocaleString(),
locked:false
};

tickets.push(ticket);
renderTickets();
}

function renderTickets() {
const tbody = document.getElementById("tickets");
tbody.innerHTML = "";

tickets.forEach(t => {

const row = document.createElement("tr");

if (t.category === "Billing" && t.urgency === "High") {
row.classList.add("high");
tbody.prepend(row);
} else {
tbody.appendChild(row);
}

row.innerHTML = `
<td>${t.customer}</td>
<td>${t.subject}</td>
<td>${t.category}</td>
<td>${t.urgency}</td>
<td>${t.status}</td>
<td>
<select onchange="assignAgent(${t.id}, this.value)" ${t.locked ? "disabled" : ""}>
<option ${t.agent==="Unassigned"?"selected":""}>Unassigned</option>
<option ${t.agent==="Agent A"?"selected":""}>Agent A</option>
<option ${t.agent==="Agent B"?"selected":""}>Agent B</option>
</select>
</td>
<td>${t.created}</td>
<td>
<button onclick="resolveTicket(${t.id})">Resolve</button>
<button onclick="deleteTicket(${t.id})">Delete</button>
</td>
`;
});
}

function assignAgent(id, agent) {
tickets = tickets.map(t => {
if (t.id === id && !t.locked) {
t.agent = agent;
t.status = "Assigned";
}
return t;
});
renderTickets();
}

function resolveTicket(id) {
tickets = tickets.map(t => {
if (t.id === id) {
t.status = "Resolved";
t.locked = true;
}
return t;
});
renderTickets();
}

function deleteTicket(id) {
tickets = tickets.filter(t => t.id !== id);
renderTickets();
}