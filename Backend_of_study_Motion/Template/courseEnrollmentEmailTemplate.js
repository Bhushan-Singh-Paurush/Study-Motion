
const courseEnrollmentEmailTemplate=(courseName,studentName)=>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Registration Confirmation</title>

    <style>
        *{
          box-sizing: border-box;
          padding: 0;
          margin: 0;
        }
        body{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        overflow-y: auto; 
        }
       .Containar{
        display: flex;
        flex-direction: column;
        width: 80%;
        max-width: 600px;
        gap: 40px;
        justify-content: center;
        align-items: center;
        font-family: sans-serif;
       }
       .Symbol{
        position: relative;
        display: flex;
        background:rgba(255, 255, 0, 0.889);
        align-items: center;
        gap: 10px;
        padding: 5px 20px;
        border-radius: 5px;
        font-size:large;
       }
      .Subject{
        color: rgb(54, 53, 53);
        font-size: larger;
      }
      .Dashborad-Button{
        font-size:large;
        padding: 10px 20px;
        background:rgba(255, 255, 0, 0.889);
        text-decoration: none;
        color: inherit;
        border-radius: 5px;
      }
      .Content{
        font-size: large;
        color: rgb(54, 53, 53);
        text-align: center;
      }
    </style>
</head>
<body >
    <div class="Containar">
    <div class="Symbol">
        <img class="logo" src="https://res.cloudinary.com/dgeumzbuo/image/upload/t_study/v1740856296/DALL_E_2025-03-02_00.40.53_-_A_modern_and_minimalistic_logo_with_the_name_STUDY_MOTION_._The_logo_should_have_a_bold_S_inside_a_circular_icon_followed_by_the_text_STUDY_MOTIO_lfvujk.webp" alt="StudyMotion Logo" />

        <div class="studymotion">Study Motion</div>
    </div>
    
   <div class="Subject">Course Registration Confirmation</div>
   <div class="Subject">Dear ${studentName}</div>
   <div class="Content">You have successfully registered for the course <span style="color:black;">${courseName}</span>. We are excited to have you as a participant!</div>
<div class="Content">Please log in to your learning dashboard to access the course materials and start your learning journey.</div>
<a class="Dashborad-Button" href="">Go to Dashboard</a>
<div class="Content">If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:example@example.com">example@example.com</a>. We are here to help!</div>
</div>
</body>
</html>`

}

module.exports=courseEnrollmentEmailTemplate
