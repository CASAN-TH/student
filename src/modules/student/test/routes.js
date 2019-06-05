'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Student = mongoose.model('Student');

var credentials,
    token,
    mockup;

describe('Student CRUD routes tests', function () {

    before(function (done) {
        mockup = {
                
                "name": 'name',
                "firstname" : "พีรวีส",
                "lastname" : "พีรวีส",
                "nickname" : "พี",
                "citizenid" : "11234466879",
                "birthdate" : "10/7/57",
                "birthplace" : "กทม",
                "sibling" : {
                    "number" : "3",
                    "position" : "2"
                },
                "nationality" : "ไทย",
                "race" : "ไทย",
                "religion" : "พุทธ",
                "bloodgroup" : "A",
            
                "Parentsofstudents" : {
                    "firstname" : "สมใจ",
                    "lastname" : "ใจสม",
                    "childrelationship" : "ย่า",
                    "contact" : "123456789",
                    "address" : {
                        "no" : "26/5",
                        "subdistric" : "คูคต",
                        "distric" : "ลำลูกกา",
                        "province" : "ปทุม",
                        "postcode" : "12150"
                    }
                },
            
                "father" : {
                    "firstname" : "ไพรัตน์",
                    "lastname" : "รัตไพ",
                    "age" : "40",
                    "occupation" : "งาน",
                    "education" : "เรียน",
                    "homephone" : "0564123789",
                    "telephone" : "0869957896",
                    "email" : "f@gmail.com",
                    "address" : {
                        "no" : "89/7",
                        "subdistric" : "คูคต",
                        "distric" : "ลำลูกกา",
                        "province" : "ปทุม",
                        "postcode" : "12150"
                    }
                },
            
                "mother" : {
                    "firstname" : "วรวรรณ",
                    "lastname" : "วรรณวร",
                    "age" : "25",
                    "occupation" : "งาน1",
                    "education" : "เรียน1",
                    "homephone" : "056787454",
                    "telephone" : "09458789",
                    "email" : "v@gmail.com",
                    "address" : {
                        "no" : "77/4",
                        "subdistric" : "สายไหม",
                        "distric" : "สายไหม",
                        "province" : "ปทุม",
                        "postcode" : "12356"
                    }
                },
            
                "maritalstatus" : "อยู่ด้วยกัน",
            
                "birthtype" : "ธรรมชาติ",
                
                "Educationlevel":[
                    {
                    "year":"2559",
                    "childmedicalinformation":{
                        "height":"156",
                        "weight":"40",
                        "age":"12 ปี",
                        "seriousillnesses":"ไม่มี",
                        "drugsensitivity":"ไม่มี",
                        "foodsensitivity":"ไม่",
                        "familydoctor":{
                            "fullname":"จำไม่ได้",
                            "hospital":"รัฐบาล"
                        }
                    },
                    "studentEducationDetails":{
                        "presentgrade":"ป.6",
                        "school":"ไตรพัฒ",
                        "classofentry":"ม1",
                        "semester":"1",
                        "year":"2559"
                    },
                    "personalInformation": {
                        "informationQuestionAnswer":[
                            {
                            "titlegroup":"ประวัติการศึกษา",
                            "questionandanswer": [
                                {
                                    "question": "โรงเรียนอนุบาล",
                                    "answer": "โรงเรียนอนุบาลเมืองลำลูกกา"
                                },
                                {
                                    "question": "สาเหตุที่ย้ายโรงเรียน",
                                    "answer": "โรงเรียนเดิมไม่สามารถเพิ่มความรู้ให้เด็กได้"
                                },
                                {
                                    "question": "สิ่งที่คาดหวังจากโรงเรียน",
                                    "answer": "สอนเด็กเป็นคนดี"
                                }
                            ]
                        },
                        {
                            "titlegroup":"ความสนใจ",
                            "questionandanswer": [
                                {
                                    "question": "ศิลปะ",
                                    "answer": "วาดภาพสีน้ำมัน"
                                },
                                {
                                    "question": "ดนตรี",
                                    "answer": "กีตาร์"
                                }
                            ]
                        }
                    ],

                    "informationQuestionAnswerBoolean":[
                        {
                            "titlegroup":"ความสามารถทางด้านร่างกาย",
                            "questionandanswerBoolean": [
                                {
                                    "question": "กระโดดคู่สองขา",
                                    "answerBoolean": true
                                },
                                {
                                    "question": "เดินบนคานทรงตัวได้ดี",
                                    "answerBoolean": true
                                },
                                {
                                    "question": "กระโดดสลับซ้ายขวา",
                                    "answerBoolean": false
                                }
                            ]
                        }
                    ]
                    }
                }
            ]
            }
        
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Student get use token', (done)=>{
        request(app)
        .get('/api/students')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .end((err, res)=>{
            if (err) {
                return done(err);
            }
            var resp = res.body;
            done();
        });
    });

    it('should be Student get by id', function (done) {

        request(app)
            .post('/api/students')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/students/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.name, mockup.name);
                        assert.equal(resp.data.firstname,mockup.firstname);
                        assert.equal(resp.data.lastname,mockup.lastname);
                        assert.equal(resp.data.nickname,mockup.nickname);
                        assert.equal(resp.data.citizenid,mockup.citizenid);
                        assert.equal(resp.data.birthplace,mockup.birthplace);
                        assert.equal(resp.data.sibling.no,mockup.sibling.no);
                        assert.equal(resp.data.sibling.position,mockup.sibling.position);
                        assert.equal(resp.data.nationality,mockup.nationality);
                        assert.equal(resp.data.race,mockup.race);
                        assert.equal(resp.data.religion,mockup.religion);
                        assert.equal(resp.data.bloodgroup,mockup.bloodgroup);
                        assert.equal(resp.data.Parentsofstudents.name,mockup.Parentsofstudents.name);
                        assert.equal(resp.data.Parentsofstudents.lastname,mockup.Parentsofstudents.lastname);
                        assert.equal(resp.data.Parentsofstudents.childrelationship,mockup.Parentsofstudents.childrelationship);
                        assert.equal(resp.data.Parentsofstudents.contact,mockup.Parentsofstudents.contact);
                        assert.equal(resp.data.Parentsofstudents.address.no,mockup.Parentsofstudents.address.no);
                        assert.equal(resp.data.Parentsofstudents.address.distric,mockup.Parentsofstudents.address.distric);
                        assert.equal(resp.data.Parentsofstudents.address.subdistric,mockup.Parentsofstudents.address.subdistric);
                        assert.equal(resp.data.Parentsofstudents.address.province,mockup.Parentsofstudents.address.province);
                        assert.equal(resp.data.Parentsofstudents.address.postcode,mockup.Parentsofstudents.address.postcode);
                        assert.equal(resp.data.father.name,mockup.father.name);
                        assert.equal(resp.data.father.lastname,mockup.father.lastname);
                        assert.equal(resp.data.father.age,mockup.father.age);
                        assert.equal(resp.data.father.occupation,mockup.father.occupation);
                        assert.equal(resp.data.father.homephone,mockup.father.homephone);
                        assert.equal(resp.data.father.telephone,mockup.father.telephone);
                        assert.equal(resp.data.father.email,mockup.father.email);
                        assert.equal(resp.data.father.address.no,mockup.father.address.no);
                        assert.equal(resp.data.father.address.distric,mockup.father.address.distric);
                        assert.equal(resp.data.father.address.subdistric,mockup.father.address.subdistric);
                        assert.equal(resp.data.father.address.province,mockup.father.address.province);
                        assert.equal(resp.data.father.address.postcode,mockup.father.address.postcode);
                        assert.equal(resp.data.mother.name,mockup.mother.name);
                        assert.equal(resp.data.mother.lastname,mockup.mother.lastname);
                        assert.equal(resp.data.mother.age,mockup.mother.age);
                        assert.equal(resp.data.mother.occupation,mockup.mother.occupation);
                        assert.equal(resp.data.mother.homephone,mockup.mother.homephone);
                        assert.equal(resp.data.mother.telephone,mockup.mother.telephone);
                        assert.equal(resp.data.mother.email,mockup.mother.email);
                        assert.equal(resp.data.mother.address.no,mockup.mother.address.no);
                        assert.equal(resp.data.mother.address.distric,mockup.mother.address.distric);
                        assert.equal(resp.data.mother.address.subdistric,mockup.mother.address.subdistric);
                        assert.equal(resp.data.mother.address.province,mockup.mother.address.province);
                        assert.equal(resp.data.mother.address.postcode,mockup.mother.address.postcode);
                        assert.equal(resp.data.maritalstatus.status,mockup.maritalstatus.status);
                        assert.equal(resp.data.Educationlevel[0].childmedicalinformation.height,mockup.Educationlevel[0].childmedicalinformation.height);
                        assert.equal(resp.data.Educationlevel[0].childmedicalinformation.weight,mockup.Educationlevel[0].childmedicalinformation.weight);
                        assert.equal(resp.data.Educationlevel[0].childmedicalinformation.age,mockup.Educationlevel[0].childmedicalinformation.age);
                        assert.equal(resp.data.Educationlevel[0].childmedicalinformation.seriousillnesses,mockup.Educationlevel[0].childmedicalinformation.seriousillnesses);
                        assert.equal(resp.data.Educationlevel[0].childmedicalinformation.drugsensitivity,mockup.Educationlevel[0].childmedicalinformation.drugsensitivity);
                        assert.equal(resp.data.Educationlevel[0].childmedicalinformation.foodsensitivity,mockup.Educationlevel[0].childmedicalinformation.foodsensitivity);
                        assert.equal(resp.data.Educationlevel[0].childmedicalinformation.familydoctor.fullname,mockup.Educationlevel[0].childmedicalinformation.familydoctor.fullname);
                        assert.equal(resp.data.Educationlevel[0].childmedicalinformation.familydoctor.hospital,mockup.Educationlevel[0].childmedicalinformation.familydoctor.hospital);
                        assert.equal(resp.data.Educationlevel[0].studentEducationDetails.presentgrade,mockup.Educationlevel[0].studentEducationDetails.presentgrade);
                        assert.equal(resp.data.Educationlevel[0].studentEducationDetails.school,mockup.Educationlevel[0].studentEducationDetails.school);
                        assert.equal(resp.data.Educationlevel[0].studentEducationDetails.classofentry,mockup.Educationlevel[0].studentEducationDetails.classofentry);
                        assert.equal(resp.data.Educationlevel[0].studentEducationDetails.semester,mockup.Educationlevel[0].studentEducationDetails.semester);
                        assert.equal(resp.data.Educationlevel[0].studentEducationDetails.year,mockup.Educationlevel[0].studentEducationDetails.year);
                        
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswer[0].titlegroup,mockup.Educationlevel[0].personalInformation.informationQuestionAnswer[0].titlegroup);
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswer[0].questionandanswer[0].question,mockup.Educationlevel[0].personalInformation.informationQuestionAnswer[0].questionandanswer[0].question);
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswer[0].questionandanswer[0].answer,mockup.Educationlevel[0].personalInformation.informationQuestionAnswer[0].questionandanswer[0].answer);
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswer[0].questionandanswer[1].question,mockup.Educationlevel[0].personalInformation.informationQuestionAnswer[0].questionandanswer[1].question);
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswer[0].questionandanswer[1].answer,mockup.Educationlevel[0].personalInformation.informationQuestionAnswer[0].questionandanswer[1].answer);
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswer[0].questionandanswer[2].question,mockup.Educationlevel[0].personalInformation.informationQuestionAnswer[0].questionandanswer[2].question);
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswer[0].questionandanswer[2].answer,mockup.Educationlevel[0].personalInformation.informationQuestionAnswer[0].questionandanswer[2].answer);
                        
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswer[1].titlegroup,mockup.Educationlevel[0].personalInformation.informationQuestionAnswer[1].titlegroup);
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswer[1].questionandanswer[0].question,mockup.Educationlevel[0].personalInformation.informationQuestionAnswer[1].questionandanswer[0].question);
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswer[1].questionandanswer[0].answer,mockup.Educationlevel[0].personalInformation.informationQuestionAnswer[1].questionandanswer[0].answer);
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswer[1].questionandanswer[1].question,mockup.Educationlevel[0].personalInformation.informationQuestionAnswer[1].questionandanswer[1].question);
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswer[1].questionandanswer[1].answer,mockup.Educationlevel[0].personalInformation.informationQuestionAnswer[1].questionandanswer[1].answer);
                        
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswerBoolean[0].titlegroup,mockup.Educationlevel[0].personalInformation.informationQuestionAnswerBoolean[0].titlegroup);
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswerBoolean[0].questionandanswerBoolean[0].question,mockup.Educationlevel[0].personalInformation.informationQuestionAnswerBoolean[0].questionandanswerBoolean[0].question);
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswerBoolean[0].questionandanswerBoolean[0].answer,mockup.Educationlevel[0].personalInformation.informationQuestionAnswerBoolean[0].questionandanswerBoolean[0].answer);
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswerBoolean[0].questionandanswerBoolean[1].question,mockup.Educationlevel[0].personalInformation.informationQuestionAnswerBoolean[0].questionandanswerBoolean[1].question);
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswerBoolean[0].questionandanswerBoolean[1].answer,mockup.Educationlevel[0].personalInformation.informationQuestionAnswerBoolean[0].questionandanswerBoolean[1].answer);
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswerBoolean[0].questionandanswerBoolean[2].question,mockup.Educationlevel[0].personalInformation.informationQuestionAnswerBoolean[0].questionandanswerBoolean[2].question);
                        assert.equal(resp.data.Educationlevel[0].personalInformation.informationQuestionAnswerBoolean[0].questionandanswerBoolean[2].answer,mockup.Educationlevel[0].personalInformation.informationQuestionAnswerBoolean[0].questionandanswerBoolean[2].answer);
                        done();
                    });
            });

    });

    it('should be Student post use token', (done)=>{
        request(app)
            .post('/api/students')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.data.name, mockup.name);
                done();
            });
    });

    it('should be student put use token', function (done) {

        request(app)
            .post('/api/students')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/students/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.data.name, update.name);
                        done();
                    });
            });

    });

    it('should be student delete use token', function (done) {

        request(app)
            .post('/api/students')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/students/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be student get not use token', (done)=>{
        request(app)
        .get('/api/students')
        .expect(403)
        .expect({
            status: 403,
            message: 'User is not authorized'
        })
        .end(done);
    });

    it('should be student post not use token', function (done) {

        request(app)
            .post('/api/students')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be student put not use token', function (done) {

        request(app)
            .post('/api/students')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/students/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be student delete not use token', function (done) {

        request(app)
            .post('/api/students')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/students/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Student.remove().exec(done);
    });

});