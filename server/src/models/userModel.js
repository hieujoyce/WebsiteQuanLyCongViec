import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            maxlength: 25,
            minlength: 6,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        avatar: {
            type: String,
            default:
                "https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-1/204612696_513858903381871_4463796854127515799_n.jpg?stp=dst-jpg_p160x160&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=OtIkU7GbP08AX_Rsmun&_nc_ht=scontent.fhan14-1.fna&oh=00_AT-U7MCQP3NCCyeJgaP_pRxG47xu8CE8XfoOsPO18uaffg&oe=62B920BB",
        },
        projects: [
            {
                type: mongoose.Types.ObjectId,
                ref: "projects",
                default: [],
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("users", userSchema);
