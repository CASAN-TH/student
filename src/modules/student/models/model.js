'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var StudentSchema = new Schema({
    name: {
        type: String,
        required: 'Please fill a Student name',
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    nickname: {
        type: String
    },
    citizenid: {
        type: String
    },
    birthdate: {
        type: Date
    },
    birthplace: {
        type: String
    },
    sibling: {
        type: {
            no: {
                type: String
            },
            position: {
                type: String
            }
        }
    },
    nationality: {
        type: String
    },
    race: {
        type: String
    },
    religion: {
        type: String
    },
    bloodgroup: {
        type: String
    },

    Parentsofstudents: {
        type: {
            firstname: {
                type: String
            },
            lastname: {
                type: String
            },
            childrelationship: {
                type: String
            },
            contact: {
                type: String
            },
            address: {
                type: {
                    no: {
                        type: String
                    },
                    distric: {
                        type: String
                    },
                    subdistric: {
                        type: String
                    },
                    province: {
                        type: String
                    },
                    postcode: {
                        type: String
                    }
                }
            }

        }

    },

    father: {
        type: {
            firstname: {
                type: String
            },
            lastname: {
                type: String
            },
            age: {
                type: String
            },
            occupation: {
                type: String
            },
            homephone: {
                type: String
            },
            telephone: {
                type: String
            },
            email: {
                type: String
            },
            address: {
                type: {
                    no: {
                        type: String
                    },
                    distric: {
                        type: String
                    },
                    subdistric: {
                        type: String
                    },
                    province: {
                        type: String
                    },
                    postcode: {
                        type: String
                    }
                }
            }


        }
    },

    mother: {
        type: {
            firstname: {
                type: String
            },
            lastname: {
                type: String
            },
            age: {
                type: String
            },
            occupation: {
                type: String
            },
            homephone: {
                type: String
            },
            telephone: {
                type: String
            },
            email: {
                type: String
            },
            address: {
                type: {
                    no: {
                        type: String
                    },
                    distric: {
                        type: String
                    },
                    subdistric: {
                        type: String
                    },
                    province: {
                        type: String
                    },
                    postcode: {
                        type: String
                    }
                }
            }


        }
    },
    maritalstatus: {
        type: String
    },

    Educationlevel: {
        type: [{
            year: {
                type: String
            },
            childmedicalinformation: {
                type: {
                    height: {
                        type: String
                    },
                    weight: {
                        type: String
                    },
                    age: {
                        type: String
                    },
                    seriousillnesses: {
                        type: String
                    },
                    drugsensitivity: {
                        type: String
                    },
                    foodsensitivity: {
                        type: String
                    },
                    familydoctor: {
                        type: {
                            fullname: {
                                type: String
                            },
                            hospital: {
                                type: String
                            }
                        }
                    }
                }

            },
            studentEducationDetails: {
                type: {
                    presentgrade: {
                        type: String
                    },
                    school: {
                        type: String
                    },
                    classofentry: {
                        type: String
                    },
                    semester: {
                        type: String
                    },
                    year: {
                        type: String
                    }

                }
            },
            personalInformation: {
                type: {
                    informationQuestionAnswer: {
                        type: [{
                            titlegroup: {
                                type: String
                            },
                            questionandanswer: {
                                type: [{
                                    question: {
                                        type: String
                                    },
                                    answer: {
                                        type: String
                                    }
                                }]
                            },
                            titlegroup: {
                                type: String
                            },
                            questionandanswer: {
                                type: [{
                                    question: {
                                        type: String
                                    },
                                    answer: {
                                        type: String
                                    }
                                }]
                            },
                        }]
                    }

                },


                informationQuestionAnswerBoolean: {
                    type: [{
                        titlegroup: {
                            type: String
                        },
                        questionandanswerBoolean: {
                            type: [{
                                question: {
                                    type: String
                                },
                                answer: {
                                    type: String
                                }
                            }]
                        },
                       
                        
                    }]
                }






            }


        }]
    },

    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Student", StudentSchema);