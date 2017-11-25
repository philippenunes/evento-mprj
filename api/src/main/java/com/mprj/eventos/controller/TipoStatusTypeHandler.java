package com.mprj.eventos.controller;

import com.mprj.eventos.model.Status;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class TipoStatusTypeHandler implements TypeHandler<Status>{


    @Override
    public void setParameter(PreparedStatement preparedStatement, int i, Status status, JdbcType jdbcType) throws SQLException {
        preparedStatement.setString(i, status.getSigla());
    }

    @Override
    public Status getResult(ResultSet resultSet, String s) throws SQLException {
        return Status.from(resultSet.getString(s));
    }

    @Override
    public Status getResult(ResultSet resultSet, int i) throws SQLException {
        return Status.from(resultSet.getString(i));
    }

    @Override
    public Status getResult(CallableStatement callableStatement, int i) throws SQLException {
        return Status.from(callableStatement.getString(i));
    }
}
