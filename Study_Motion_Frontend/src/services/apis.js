const base_url=import.meta.env.VITE_BASE_URL


export const categories={
        CATEGORIES_API:base_url+"/category/showAllCategory",
        CATEGORY_PAGE:base_url+"/category/categoryPageDetails"    
}

export const auth={
        RESETPASSTOKEN:base_url+"/profile/resetPasswordToken",
        CHANGEPASS:base_url+"/profile/resetPassword",
        SENDOTP:base_url+"/auth/sendOTP",
        SIGNUP:base_url+"/auth/signUp",
        LOGIN:base_url+"/auth/login"
        
}

export const settings={
        UPDATE_DISPLAY_PICTURE:base_url+"/profile/updateDisplayPicture",
        UPDATE_PROFILE:base_url+"/profile/updateProfile",
        CHANGE_PASSWORD:base_url+"/auth/changePassword",
        DELETE_PROFILE:base_url+"/profile/deleteAccount"
}

export const profile={
        GET_ENROLLED_COURSES:base_url+"/profile/getAllEnrollCourse",
        REMOVE_ENROLLED_COURSES:base_url+"/profile/deleteEnrollCourse",
        INSTRUCTOR_DATA:base_url+"/profile/instructorCoursesData",
        CONTACT_US:base_url+"/profile/contactUs"
}

export const course={
        CREATE_COURSE:base_url+"/course/createCourse",
        UPDATE_COURSE:base_url+"/course/updateCourse",
        DELETE_COURSE:base_url+"/course/deleteCourse",
        GET_COURSE_DETAIL:base_url+"/course/getCourseDetail",
        COURSE_PROGRESS:base_url+"/course/addLectureVideo"
}
export const section={
        CREATE_SECTION:base_url+"/section/createSection",
        UPDATE_SECTION:base_url+"/section/updateSection",
        DELETE_SECTION:base_url+"/section/deleteSection"
}
export const subsection={
        CREATE_SUBSECTION:base_url+"/subsection/subSectionCreation",
        UPDATE_SUBSECTION:base_url+"/subsection/updateSubSection",
        DELETE_SUB_SECTION:base_url+"/subsection/deleteSubSection"
}
export const rating={
        GET_RATING:base_url+"/rating/getAverageRating",
        CREATE_RATING_AND_REVIEW:base_url+"/rating/RatingAndReview",
        GET_ALL_REVIEWS:base_url+"/rating/getAllRating"
}
export const payment={
        CAPTURE_PAYMENT:base_url+"/payment/capturePayment",
        SENT_EMAIL:base_url+"/payment/sendPaymentSuccessEmail",
        VERIFY_SIGNATURE:base_url+"/payment/verifySignature"
}