

class NoteController {
    constructor() {

    }

    async loginUser(req, res) {
        let item = {
            status: true,
            message: "You have logined successfully.."
        }
        res.status(202);
        res.json(item);
    }

    async registerUser(req, res) {
        let item = {
            status: true,
            message: "You have register successfully.."
        }
        res.json(item);
    }

    async addNote(req,res){

    }

    async getNotes(req, res) {
        let item = [
            {
                id: 3456,
                title: "NodeS Backend",
                note: "Hello i statrted my first nodejs backend using mongodb",
                isArchive: true,
                isPinned: false,
                color: "#f4f4f4"
            },
            {
                id: 3457,
                title: "NodeS Backend",
                note: "Hello i statrted my first nodejs backend using mongodb",
                isArchive: true,
                isPinned: false,
                color: "#f4f4f4"
            },
            {
                id: 3458,
                title: "NodeS Backend",
                note: "Hello i statrted my first nodejs backend using mongodb",
                isArchive: true,
                isPinned: false,
                color: "#f4f4f4"
            },
            {
                id: 3459,
                title: "NodeS Backend",
                note: "Hello i statrted my first nodejs backend using mongodb",
                isArchive: true,
                isPinned: false,
                color: "#f4f4f4"
            },
        ]
        res.json(item);
    }
}

module.exports = NoteController;